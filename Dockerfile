FROM node as build-stage
# FROM programmerzbb/node-nginx
# FROM programmerzbb/nginxweb

WORKDIR /app

# RUN mkdir -p /app/nginx/html
COPY package.json .

# COPY ./chore/nginx/nginx.conf /usr/local/nginx/conf/nginx.conf

RUN npm config set registry https://r.cnpmjs.org

RUN npm i

COPY . .

RUN mkdir -p /data/uploads

RUN npm run build

# 不能再当前目录下执行打包命令，因为此时已经进入了docker内部文件
# RUN npm i

# RUN npm run build

# COPY ./dist/ /app/nginx/html/
# RUN cp ./dist/ /app/nginx/html/


# 让nginx 服务卡到前台不结束，防止docker容器关闭
CMD npm run start
# CMD nginx

# 打包
# sudo docker build --force-rm -t programerzbb/blog:v3 .
# 启动
# sudo docker run -itd -p 8000:3000 -v $HOME/data/uploads:/data/uploads --name blog-fe --rm programerzbb/blog:v3
