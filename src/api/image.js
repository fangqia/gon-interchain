import {$postThird} from '@/utils/request';



export function uploadImage(file, onUploadProgress) {
    
    
     
    const formData = new FormData();
    formData.append('image', file);

    //xxl post third
    return $postThird('/upImage', formData, {
        headers: {
            'Content-Type': 'application/octet-stream',
            accessKey: 'uptick',
            accessKeySecret: 'AF0F59F1EEC1728CCFCD5B7B6203D229'
        },
        onUploadProgress
    })
}

export function uploadJSON2IPFS(object) {
  const formData = new FormData();
  for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
          const element = object[key];
		  formData.append(key, element);
      }
  }
  
    // debugger
    return $postThird('/upJson', formData, {
        headers: {
          'Content-Type': 'application/octet-stream',
            accessKey: 'uptick',
            accessKeySecret: 'AF0F59F1EEC1728CCFCD5B7B6203D229'
        }
    })
}

//图片显示
export function getNftImg(hash){
    // console.log("wxl --- getNftImg",hash,'https://d3i65oqeoaoxhj.cloudfront.net/' + hash + '/small')

    return 'https://d3i65oqeoaoxhj.cloudfront.net/' + hash + '/small'
};
export function getNftIpsh(hash){
    // console.log("wxl --- getNftImg",hash,'https://d3i65oqeoaoxhj.cloudfront.net/' + hash + '/small')

    return 'http://ipfs.upticknft.com/ipfs/' + hash
};
//图片显示
export function getImgUrl2Hash(url){
   url=url.replace("https://d3i65oqeoaoxhj.cloudfront.net/","");
    url=url.replace("/small","");

    return url;
};
//图片IPFS地址
export function getIPFSurl(hash){
    return 'https://s3.uptick.network/' + hash + '.json'
};



