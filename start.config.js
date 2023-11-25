module.exports = {
  apps: [
    {
      name: "R3F-EDITOR-BACK-CDN",
      script: "./src/app.ts",
      interpreter: "/usr/bin/ts-node",
      env: {
        PORT: 666,
      },
      instances: 6,
      autorestart:true,
      exec_mode: "cluster",
      watch: ["src"],
      ignore_watch: ["node_modules","ETHCI-r3f-editor"],
      cwd: "/home/ethci/projects/R3f-editor-back/",
      interpreter_args:"--experimental-modules"
    },
  ],
};