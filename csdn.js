/**
 * @fileoverview CSDN App 去开屏与去广告脚本
 * 适用: Quantumult X
 */

const url = $request.url;
let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        // 1. 关闭聚合开屏广告 (TradPlus) 及去除热启动广告延迟
        if (url.indexOf("/community/v1/profile/app/get-ios-config") !== -1) {
            if (obj.data) {
                if (obj.data.tradPlusConfig) {
                    obj.data.tradPlusConfig.isLaunchShow = false;       // 关闭开屏广告
                    obj.data.tradPlusConfig.isFeedShow = false;         // 关闭信息流广告
                    obj.data.tradPlusConfig.isBlogRecommendShow = false;// 关闭推荐广告
                    obj.data.tradPlusConfig.isBlogBottomShow = false;   // 关闭文末广告
                }
                if (obj.data.hotStartAd) {
                    obj.data.hotStartAd.fetchDelay = 0;
                    obj.data.hotStartAd.tpFetchDelay = 0;
                }
            }
        }

        // 2. 修改免广告特权标识
        if (url.indexOf("/silkroad-api/api/v2/assemble/list/pub/channel/app_no_ads_user") !== -1) {
            if (obj.data) {
                obj.data.isNoAdsUser = true;
            }
        }

        body = JSON.stringify(obj);
    } catch (e) {
        // 解析异常直接放行
    }
}

$done({ body });
