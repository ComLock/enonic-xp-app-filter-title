//import {toStr} from '/lib/enonic/util';
import {
    getContent as getCurrentContent,
    getSite as getCurrentSite,
    getSiteConfig as getCurrentAppSiteConfig
} from '/lib/xp/portal';


export function responseFilter(req, res) {
    //log.info(toStr({req}));
    //log.info(toStr({res}));
    const siteConfig = getCurrentAppSiteConfig(); //log.info(toStr({siteConfig}));
    const site = getCurrentSite(); //log.info(toStr({site}));
    const content = getCurrentContent(); //log.info(toStr({content}));

    const {displayName} = content; //log.info(toStr({displayName}));
    const isFrontpage = site._path === content._path; //log.info(toStr({isFrontpage}));
    const {appendSitename, titleSeparator, removeSitenameOnFrontpage} = siteConfig; //log.info(toStr({titleBehaviour, titleSeparator, titleFrontpageBehaviour}));
    let title = displayName;
    if (appendSitename && !(isFrontpage && removeSitenameOnFrontpage)) {
        title += `${titleSeparator}${site.displayName}`;
    }
    //log.info(toStr({title}));

    if (!res.pageContributions.headBegin) {
        res.pageContributions.headBegin = [];
    } else if (!Array.isArray(res.pageContributions.headBegin)) {
        res.pageContributions.headBegin = [res.pageContributions.headBegin];
    }
    res.pageContributions.headBegin.push(`<title>${title}</title>`);
    //log.info(toStr({res}));
    return res;
}
