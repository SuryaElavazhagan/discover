# Discover

Prerequisites:
- `node`
- `yarn`
- `aws`

### Start Development server:

```sh
yarn start
```

### Production build:

```sh
yarn build
```

### Deployment:

```sh
sh deploy.sh
```

### AWS Setup details
- Created S3 bucket
- Created distribution for the same S3 bucket in cloudfront
(Cloudfront would automatically gzip the files uploaded to it, and all the cool CDN things)
- During deployment, first all build files will be pushed to S3 bucket and I'll also push the same
to `surge.sh`
(Usually the index.html file would be always served by a server instead of a CDN - because the index.html file would be cached and we need to invalidate all cache whenever there's a change)

### Deployment steps
- `yarn build` - Builds the app
- `aws s3 cp ...` - Uploads the built files to S3 bucket (aws cli should be configured before this)
- `surge build https://tmdb-discover.surge.sh` - Uploads the built files to surge.sh, but the index.html file would refer to cloudfront since I've added PUBLIC_URL as cloudfront base URL and deploys it to the specified URL. (surge should be in logged in state before this)


My `.env` file looks similar to this:
```
BROWSER=none
REACT_APP_TMDB_API_KEY=<api-key>
PUBLIC_URL=https://d142bwlw6f7fla.cloudfront.net
```
