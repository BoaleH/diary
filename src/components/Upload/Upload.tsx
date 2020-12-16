import React, { Component, Fragment, createRef } from "react";
import "./Upload.scss";
import { Toast } from "antd-mobile";
import activityApi from "../../api/activityApi";
// import ImageCompressor from 'image-compressor.js';
import { handleFile } from '../../utils/util.exif';
import { isWeixin, isMQQbrowser, isAndroid, isQuark } from '../../utils/util.browser';

const defaultProps = {
  fileType: 'image',
  accept: '*',
  enableCompress: true,
  maxWidth: 1024,
  quality: 0.92,
};

type StateType = {
  firstFile: any;
  [propName: string]: any;
};
type PropType = {
  fileType?: string; // 上传的文件类型
  accept?: string;
  uploadCallBack: any;
  enableCompress?: boolean;
  maxWidth?: string | number;
  quality?: string | number;
  maxMByte?: number; // 最大文件大小，单位MB
  imgWidthScale?: number; // 图片宽:高比例 宽占比
  imgHeightScale?: number; // 图片宽:高比例 高占比
  imgMinWidthResolution?: number; // 图片限制最小宽度
  imgMaxWidthResolution?: number; // 图片限制最大宽度
  imgMinHeightResolution?: number; // 图片限制最小高度
  imgMaxHeightResolution?: number; // 图片限制最大高度
  [propName: string]: any;
};

interface Upload {
  state: StateType;
  props: PropType;
  uploadRef: any;
}

class Upload extends Component {
  // 设置默认props
  static defaultProps = defaultProps;
  constructor(props: any) {
    super(props);
    this.state = {
      firstFile: null,
    };
    this.uploadRef = createRef();
  }

  componentDidMount() {
    this.setCapture();
  }

  private setCapture = () => {
    const input: any = document.getElementById('file');
    //使用了什么内核：window.navigator.userAgent
    if (isAndroid() && isWeixin() && !isMQQbrowser()) {
      //强制添加摄像头调用功能
      input.capture = 'camera';
    } else {
      input.removeAttribute('capture');
    }
  }

  // 处理文件改变
  private handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    console.log(file)
    this.setState({
      firstFile: file,
    });
    if (!file.size) {
      return;
    }
    if (e.target && file) {
      Toast.loading('文件上传中，请稍等……', 0);
      let errorMsg = null;
      if (this.props.maxMByte && (file.size > this.props.maxMByte * 1024 * 1024)) {
        errorMsg = `文件大小不能超过${this.props.maxMByte}M`;
      }
      if (this.props.fileType === 'image' && !/image\/\w+/.test(file.type)) {
        errorMsg = '请上传图片类型的文件';
      }
      if (errorMsg) {
        Toast.fail(errorMsg, 2);
        e.target.value = null;
        return;
      }
      // 判断图片比例和图片像素
      this.props.fileType === 'image' && await this.AnalysisResolution(file);
      // if (this.props.fileType === 'image') {
      //   const imageCompressor = new ImageCompressor();
      //   imageCompressor.compress(file, { quality: 0.3, maxHeight: 4000, maxWidth: 4000 })
      //     .then((result: any) => {
      //       if (result.size > 10 * 1024 * 1024) {
      //         Toast.fail('图片不得超过10M');
      //         return;
      //       }
      //       this.fetchUpload(result);
      //     })
      //     .catch((err: any) => {
      //       Toast.fail('压缩错误');
      //     });
      //   return;
      // }
      // this.fetchUpload(file);
      const { enableCompress, maxWidth, quality, fileType } = this.props;
      if (fileType === 'image') {
        const doSquash = file.type === 'image/jpeg';
        handleFile(
          file,
          {
            maxWidth,
            quality,
            enableCompress,
          },
          doSquash,
        ).then((blob) => {
          this.fetchUpload(blob);
        });
        return;
      }
      this.fetchUpload(file);
    }
  }

  // 分析分辨率
  private AnalysisResolution = (file: any) => {
    const that: any = this;
    const promise: any = new Promise((resolve: any, reject: any) => {
      const { imgWidthScale, imgHeightScale, imgMinWidthResolution, imgMaxWidthResolution, imgMinHeightResolution, imgMaxHeightResolution } = this.props;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e: any) {
        var data = e.target.result;
        //加载图片获取图片真实宽度和高度
        var image = new Image();
        image.src = data;
        image.onload = function () {
          var width = image.width;
          var height = image.height;
          console.log(width, height);
          if (imgWidthScale && imgHeightScale && (width / height !== imgWidthScale / imgHeightScale)) {
            setTimeout(() => {
              Toast.info(`建议图片比例${imgWidthScale}:${imgHeightScale}`, 2)
            }, 500)
          }
          if (imgMinWidthResolution && imgMinHeightResolution && (width < imgMinWidthResolution || height < imgMinHeightResolution)) {
            setTimeout(() => {
              Toast.info(`图片像素至少为${imgMinWidthResolution}*${imgMinHeightResolution}`, 2)
            }, 500)
            that.uploadRef.current.value = null;
            that.setState({
              firstFile: null
            })
            reject(false);
            return;
          }
          if (imgMaxWidthResolution && imgMaxHeightResolution && (width > imgMaxHeightResolution || height > imgMaxHeightResolution)) {
            setTimeout(() => {
              Toast.info(`图片像素最大为${imgMaxWidthResolution}*${imgMaxHeightResolution}`, 2)
            }, 500)
            that.uploadRef.current.value = null;
            that.setState({
              firstFile: null
            })
            reject(false);
            return;
          }
          resolve(true);
          return
        }
      }
    })
    return promise;
  }

  private fetchUpload = async (file: any) => {
    const formData = new FormData();
    if (isQuark()) { // 夸克浏览器上传原文件，否则后台接受文件size为0
      formData.append('file', this.state.firstFile, this.state.firstFile.name);
    } else {
      formData.append('file', file, this.state.firstFile.name);
    }
    const res: any = await activityApi.uploadImageApi(formData, localStorage.getItem('employeeUserNo'));
    Toast.hide();
    const callBackData = {
      fileKey: res.data.fileKey,
      imageUrl: res.data.fileUrl,
    };
    this.uploadRef.current.value = null;
    this.setState({
      firstFile: null
    })
    this.props.uploadCallBack(callBackData);
  };

  render() {
    const { accept } = this.props;

    return (
      <Fragment>
        <input className="upload-input" type='file' id="file" ref={this.uploadRef} accept={accept} onChange={this.handleFileChange}></input>
      </Fragment>
    );
  }
}

export default Upload;
