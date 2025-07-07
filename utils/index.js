// 扫一扫
export const ScanCode = (scanType = ['qrCode']) => {
    // res.scanType: '条码类型', res.result: '条码内容'
    return new Promise((resolve, reject) => {
    	uni.scanCode({
    		onlyFromCamera: true,
    		scanType: scanType,
    		success: function (res) { 
                console.log('res.result',res.result);
    			// res.result = JSON.parse(res.result);
    			resolve(res);
    		},
    		fail: function(e) {
    			reject(e);
    		}
    	});
    });
}