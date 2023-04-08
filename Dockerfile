FROM programmerzbb/node-nginx
# FROM programmerzbb/nginxweb

WORKDIR /app

RUN mkdir -p /app/nginx/html

COPY . /app

# COPY ./chore/nginx/nginx.conf /usr/local/nginx/conf/nginx.conf

RUN npm config set registry https://registry.npm.taobao.org

# 不能再当前目录下执行打包命令，因为此时已经进入了docker内部文件
RUN npm i

RUN npm run build

# COPY ./dist/ /app/nginx/html/
# RUN cp ./dist/ /app/nginx/html/


# 让nginx 服务卡到前台不结束，防止docker容器关闭
CMD npm run start
# CMD nginx

# 打包
# sudo docker build -t programerzbb/blog:v2 .
