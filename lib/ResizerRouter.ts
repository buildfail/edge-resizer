import { RouteEntry, Router, RouterOptions } from 'itty-router';

interface IWaitableObject {
    waitUntil: (promise: Promise<any>) => void;
}
export type TImageParameters = { transforms: Record<string & keyof IdefaultSearchParams, string>; } & {
    [s: string]: string;

};
export type RequestWithParams = Request & {

    params?: TImageParameters;

};

export type Context = {
    request: Request;

} & IWaitableObject;


export interface EnvWithBindings {
    DEBUG: boolean;
    WORKER_ENV: string;
    ROUTE_PREFIX: string;
}


function getFileName(url: URL): { fileName: string; extension: string } {
    const { pathname } = url,
        fileName = ((pathname || '').split('/').pop() || '').split('.'),
        extension = (fileName.pop() || '').toLowerCase();
    return { fileName: [...fileName, extension].join('.'), extension };
}


export interface IdefaultSearchParams {
    cbg: string;
    bg: string;
    fit: string;
    af: string;
    l?: string;
    w?: string | null;
    h?: string | null;
    output?: string;
    filename?: string;
    q?: string;
    n?: string;
    il?: string;
    sharp?: string;
    cw?: number;
    cy?: number;
    a?: string;
    cx?: number;
    ch?: number;
    hue?: number;
    dpr?: number;


    precrop?: string;

}

export interface IOutputFormats {
    jpg?: string;
    png?: string;
    gif?: string;
    tiff?: string;
    webp?: string;

    auto?: string;
}

export const AvailableFormats: Record<keyof IOutputFormats, string> = {
    jpg: 'Short for output=jpg',
    png: 'Short for output=png',
    tiff: 'Short for output=tiff',
    gif: 'Short for output=gif',
    webp: 'Short for output=webp',

    auto: `check the accept header  for webp support and use it if affirmative`
}
export const AvailableTransforms: Record<keyof IdefaultSearchParams, string> = {
    cbg: 'Background Color for Fit=Contain',
    bg: 'Background Color', //https://images.weserv.nl/docs/adjustment.html#background
    fit: 'Fit', //https://images.weserv.nl/docs/fit.html#inside
    af: 'Adaptative Filter', //https://images.weserv.nl/docs/format.html#adaptive-filter
    l: 'Compression Level', //https://images.weserv.nl/docs/format.html#compression-level
    w: 'Width',
    h: 'Height',
    a: 'Alignment',
    output: 'Output', //https://images.weserv.nl/docs/format.html#output
    filename: 'Filename', //https://images.weserv.nl/docs/format.html#filename
    q: 'Quality', //https://images.weserv.nl/docs/format.html#quality
    n: 'Number of Pages', //https://images.weserv.nl/docs/format.html#number-of-pages
    il: 'Interlaced/Progressive',
    sharp: 'Sharpen', //https://images.weserv.nl/docs/adjustment.html#sharpen
    //h:tps://images.weserv.nl/docs/crop.html#rectangle-crop
    cw: 'Crop width',
    cy: 'Crop y',
    cx: 'Crop x',
    ch: 'Crop height',
    precrop: 'Crop applied before resizing',
    hue: 'Hue',
    dpr: 'Device Pixel Ratio' //https://images.weserv.nl/docs/size.html#device-pixel-ratio


}
export class ResizerRouter {
    readonly validKeys = Object.keys(AvailableTransforms).concat(Object.keys(AvailableFormats), ['http', 'https', 'images', 'img']);


    debug: { (...data: any[]): void; };
    readonly domainGroup = `(?<domain>([a-z0-9._-]+))`;
    readonly pathNameGroup = `(?<pathname>(.*))`;
    /**
    *
    */
    get transformationsGroup(): string {
        return `(?<transformations>(_?(${this.validKeys.join('|')})?(=[^_/]*)*)*)`;
    }
    /**
 *
 */
    get groupRegex(): string {
        return `\/${this.transformationsGroup}\/${this.domainGroup}\/${this.pathNameGroup}?`;
    }


    handle: { (req: Request, env: EnvWithBindings, ctx: Context): Promise<any> }
    /**
     * The constructor expects the environment to avoid reading globals,
     * which might not exist when using module format
     *
     * @param {EnvWithBindings} env
     */
    constructor(options: RouterOptions<Request> & Partial<EnvWithBindings>) {
        this.debug = (options || {}).DEBUG ? console.log.bind('ResizerRouter:') : () => { return null; };



        const ittyRouter = Router<RequestWithParams>({
            base: options.base,

            routes: [
                ['GET', new RegExp(this.groupRegex), [this.handleMatchingRoute(this.debug)]],
            ]
        }) as Router<RequestWithParams>

        /**
         * 
         */
        ittyRouter.get('favicon*', (req: Request) => new Response(ResizerRouter.fallbackSvg(), { headers: { 'X-Requested': req.url } }))
            /**
             * Requests not handled at this point are forwarded as-is
             */
            .get('*', (req: Request) => {
                return fetch(req);
            })

        this.handle = async (req: Request, env: EnvWithBindings, ctx: Context) => {
            // console.log({ req })
            return ittyRouter.handle(req, ctx)
        }
    }

    static defaultRoutes<Q extends Request | RequestWithParams, R extends Router<Q>>(router: R): R {
        return router
            .get('/favicon*', (req: Request) => new Response(ResizerRouter.fallbackSvg(), { headers: { 'X-Requested': req.url } }))
            /**
             * Requests not handled at this point are forwarded as-is
             */
            .get('*', (req: Request) => {
                return fetch(req);
            }) as unknown as R;
    }
    handleMatchingRoute(debugFn: { (...attrs: any[]): void }): { (req: RequestWithParams, ctx: Context): Promise<Response> } {
        return (
            req: RequestWithParams,

            ctx: Context
        ): Promise<Response> => {
            const url = new URL(req.url),
                debug = debugFn
            req.params = req.params || {} as TImageParameters;

            req.params.transforms = {} as Record<string & keyof IdefaultSearchParams, string>;
            req.params.origin = url.origin;
            try {
                debug({
                    //cf: cf, referrerPolicy, origin: url.origin, host: url.host, hostname: url.hostname,
                    domain: req.params.domain,
                    pathname: req.params.pathname,
                    transformations: req.params.transformations,
                    // headers: Object.fromEntries(req.headers)
                });

                for (let [key, value] of new URLSearchParams(req.params.transformations.replace(/[_/,]/g, '&')).entries()) {
                    if (['http', 'https'].includes(key))
                        req.params.protocol = key;
                    if (Object.keys(AvailableTransforms).includes(key))
                        req.params.transforms[key as keyof IdefaultSearchParams] = value ?? true;
                    if (Object.keys(AvailableFormats).includes(key)) {
                        debug({ output: key });
                        req.params.transforms.output = key;
                    }
                }
                req.params.protocol = req.params.protocol || 'https';
                return this.thirdParty(req, ctx, debug);
            } catch (e) {
                console.error(e);
                return Promise.resolve(new Response((e as Error).message, { status: 500 }))
            }
        }

    }
    async thirdParty(
        request: RequestWithParams,

        ctx: Context,
        debug: { (...attrs: any[]): void }
    ): Promise<Response> {
        const { transforms, protocol = 'https', domain, pathname, origin } = request.params || {} as TImageParameters

        let url = new URL(request.url)

        url.pathname = pathname
        url.hostname = domain
        let accepts: string = request.headers.get('accept') || '',

            defaultSearchParams = {
                fit: 'contain',
                n: '-1',

            } as Record<string & keyof IdefaultSearchParams, string>;
        let computedSearchParams = { ...defaultSearchParams, ...transforms } as Record<string & keyof IdefaultSearchParams, string>;
        for (let [paramName, paramValue] of url.searchParams.entries()) {
            if (Object.keys(AvailableTransforms).includes(paramName as keyof IdefaultSearchParams)) {
                computedSearchParams[paramName as keyof IdefaultSearchParams] = paramValue;
            }
            if (Object.keys(AvailableFormats).includes(paramName as keyof IOutputFormats)) {
                console.info({ output: paramName })
                computedSearchParams.output = paramName
            }
        }
        let { fileName, extension } = getFileName(url)


        debug({ fileName, extension }, Object.entries(computedSearchParams).map(([key, value]) => `${key}=${value}`).join('_'))

        let urlParam = `${url.hostname}${url.pathname}`,
            weservUrl = new URL('https://images.weserv.nl/');



        if (accepts.includes('webp') && computedSearchParams.output === 'auto') {
            computedSearchParams.output = 'webp';
            if (!computedSearchParams.q) {
                computedSearchParams.q = '75'
            }
        } else if (!['tiff', 'gif', 'png', 'jpg', 'jpeg', 'webp', 'json'].includes(computedSearchParams.output)) {
         /**
          *  Remove output parameter if it's not supported
          */   let { output: discardedOutput, ...otherSearchParams } = computedSearchParams
            debug(discardedOutput)

            computedSearchParams = otherSearchParams as unknown as Record<string & keyof IdefaultSearchParams, string>;

        }
        /*if (['tiff', 'gif', 'png', 'jpg', 'jpeg', 'webp', 'json'].includes(extension)) {
            computedSearchParams.output = extension
        }*/

        if (computedSearchParams.output) {
            computedSearchParams.output = computedSearchParams.output.replace('jpeg', 'jpg')
        }


        debug(JSON.stringify({ computedSearchParams }))
        for (let [paramName, paramValue] of Object.entries(computedSearchParams)) {
            weservUrl.searchParams.set(paramName, paramValue);
        }



        let transform_slug = Object.entries(Object.fromEntries(weservUrl.searchParams)).map(([key, val]) => `${key}=${val}`).sort().join('_')

        let cacheEntry = `${origin}/${transform_slug}/${domain}/${pathname}`
        debug({ cacheEntry, fileName })
        const cache = caches.default;
        /**
         * Canonical cached URL doesn't have weserv parameters `url` nor `filename`. 
         * The former is already present in the original URL.  The latter is unrelated to the image's
         * binary contents
         * @todo The protocol isn't considered either. Shoudl it be?
         */
        let response = await cache.match(new Request(cacheEntry))
        weservUrl.searchParams.set('filename', fileName);

        weservUrl.searchParams.set('url', urlParam);
        if (['https', 'ssl'].includes(protocol)) weservUrl.searchParams.set('url', `ssl:${urlParam}`);
        if (computedSearchParams.output && computedSearchParams.output !== extension) {
            let renamedFilename = fileName.replace(`${extension}`, `${computedSearchParams.output}`);
            weservUrl.searchParams.set('filename', renamedFilename);
        }
        weservUrl.searchParams.sort()
        debug(weservUrl.toString())
        if (response) {
            //debug({ cacheHit: true, ctx });
            return response;
        }
        let {
            "accept": accept,
            "accept-encoding": accept_encoding,
            "accept-language": accept_language,
            "user-agent": user_agent,
            "cache-control": cache_control
        } = Object.fromEntries(request.headers.entries())



        return this.computeCachedResponse(
            new Request(weservUrl.toString(), {
                headers: {
                    fileName,
                    accept,
                    "accept-encoding": accept_encoding,
                    "accept-language": accept_language,
                    "user-agent": user_agent,
                    "cache-control": cache_control,
                    "X-sourceUrl": request.url,
                    "X-inputExtension": extension,
                    "X-cacheEntry": cacheEntry
                }
            }), ctx).catch(err => {
                return fetch(`https://${urlParam}`)
            })

    }
    async computeCachedResponse(imageRequest: Request, ctx: Context): Promise<Response> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let cacheEntry = imageRequest.headers.get('X-cacheEntry'),
            fileName = imageRequest.headers.get('fileName'),
            inputExtension = imageRequest.headers.get('X-inputExtension') || fileName?.split('.').pop() || ''
        const cache = caches.default;

        let resizedUrlStr = imageRequest.url
        let maxAge = 31536000
        if (imageRequest.headers.has('max-age')) {
            maxAge = Number(imageRequest.headers.get('max-age'))
        }
        let cf = {
            cacheTtl: maxAge,

            //image: { format: 'avif' },
        };
        let response = await fetch(resizedUrlStr, { cf });

        const contentType = response.headers.get('Content-Type') || '';
        // debug({ cacheMiss: response, event, contentType });
        if (!response.ok || !contentType.startsWith('image')) {
            return response
        }
        let newExtension = contentType.split('/').pop()?.replace('jpeg', 'jpg')
        response = new Response(response.body, response);
        let sourceUrl = imageRequest.headers.get('X-sourceUrl')
        //Set cache control headers to cache on browser for 1 year
        response.headers.set('Accept-CH', 'Viewport-Width');
        response.headers.append('Accept-CH', 'Width');
        response.headers.set('Vary', 'Viewport-Width, Width, Accept');
        response.headers.set('Requested-CF', JSON.stringify(cf));
        response.headers.delete('cf-cache-status');
        response.headers.set('Cache-Control', 'public, max-age=31536000');
        response.headers.set('X-Cached-On', String(Date.now()));
        response.headers.set('last-modified', new Date(Date.now() - 180000).toUTCString());
        if (sourceUrl) response.headers.set('X-sourceUrl', sourceUrl);
        response.headers.set('X-resizedUrl', resizedUrlStr);

        if (fileName) {
            response.headers.set('Content-Disposition', `inline; filename=${decodeURIComponent(fileName.replace(inputExtension, newExtension || inputExtension)).trim()}`);
        }
        let cacheRequest = cacheEntry ? new Request(cacheEntry) : imageRequest
        response.headers.set('link', `<${cacheRequest.url}>; rel="canonical"`)
        ctx.waitUntil(cache.put(cacheRequest, response.clone()));
        return response;

    }
    static fallbackSvg(): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="50.8mm" height="49.98mm" viewBox="0 0 180 177.1" xmlns="http://www.w3.org/2000/svg">
  <g transform="matrix(3.9212 0 0 3.9212 6182.7 1395.7)">
  <rect x="-1574" y="-353.15" width="40.331" height="39.59" rx="2.5955" ry="2.5955" fill="#e0ffff" opacity=".857" stroke="#0063bb" stroke-linejoin="round" stroke-width="2.7109"/>
  <text x="-1553.8228" y="-341.6825" fill="#171e31" font-family="sans-serif" font-size="9.5981px" font-weight="bold" letter-spacing="0px" stroke-width=".39821" text-anchor="middle" word-spacing="0px" style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;line-height:1.25" xml:space="preserve"><tspan x="-1553.8228" y="-341.6825" text-align="center">CTOhm</tspan><tspan x="-1553.8228" y="-329.68481" text-align="center">Edge</tspan><tspan x="-1553.8228" y="-317.68713" text-align="center">Resizer</tspan></text>
  </g>
  </svg>`;
    }

}