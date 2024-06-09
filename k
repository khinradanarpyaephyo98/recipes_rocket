{
  "version": 2,
  "builds": [
   
    {
      "src": "/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "index.js",
      "dest": "index.js"
    },
    {
       "src": "/src/routes/**/*.js",
      "dest": "/src/routes/$1"
    }
  ]
}
