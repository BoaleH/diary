import React, { Component, Fragment, createRef } from 'react';
import ImageCompressor from 'image-compressor.js';
import './Upload.scss';
import { Toast } from 'antd-mobile';
import activityApi from '../../api/activityApi';

const defaultProps = {
  fileType: "image",
};

type StateType = {
  [propName: string]: any;
};
type PropType = {
  fileType?: string;
  uploadCallBack: any;
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
    this.state = {};
    this.uploadRef = createRef();
  }

  private uploadEvent = (e: any) => {
    const file = e.target.files[0];
    if (e.target && file) {
      Toast.loading('文件上传中，请稍等……', 0);
      let errorMsg = null;
      if (this.props.fileType === 'image' && !/image\/\w+/.test(file.type)) {
        errorMsg = '请上传图片类型的文件';
      }
      if (errorMsg) {
        Toast.fail(errorMsg, 2);
        e.target.value = null;
        return;
      }
      if (this.props.fileType === 'image') {
        const imageCompressor = new ImageCompressor();
        imageCompressor.compress(file, { quality: 0.3, maxHeight: 4000, maxWidth: 4000 })
          .then((result: any) => {
            if (result.size > 10 * 1024 * 1024) {
              Toast.fail('图片不得超过10M', 2);
              return;
            }
            this.fetchUpload(result);
          })
          .catch((err: any) => {
            Toast.fail('压缩错误', 2);
          });
        return;
      }
      this.fetchUpload(file);
    }
  }

  private fetchUpload = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const res: any = await activityApi.uploadImageApi(formData, localStorage.getItem('employeeUserNo'));
    Toast.hide();
    const callBackData = {
      fileKey: res.data.fileKey,
      imageUrl: res.data.fileUrl,
    };
    this.uploadRef.current.value = null;
    this.props.uploadCallBack(callBackData);
  }

  render() {
    return (
      <Fragment>
        <input type='file' accept="image/*" ref={this.uploadRef} onChange={this.uploadEvent}></input>
      </Fragment>
    )
  }
}

export default Upload;