module.exports = {
  images: {
    domains: ["admin.broadwaypizza.com.pk", "services.broadwaypizza.com.pk"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // async redirects(){
  //   return[{
  //     source:'/feedback.aspx',
  //     destination:'https://feedback.broadwaypizza.com.pk/feedback.html?OutletID=5449',
  //     basePath:false,
  //     permanent:true,

  // }]
    
  // },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  optimizeFonts: true,
};
