# build or rebuild an image

docker build -t skmuddamsetty/posts:0.0.5 .

# push an image to docker hub

docker push skmuddamsetty/posts

# Create a pod using kubectl

k apply -f posts.yaml

# delete a pod

k delete pod pod_name

# logs inside a pod

k describe pod pod_name

# delete a deployment

k delete deployment depl_name

# describe a deployment

k describe deployment depl_name

# rollout and restart a deployment. This is to push a code change. Before rolling out build an image with updated code

k rollout restart deployment depl_name

# get the services running inside k cluster

k get services

4000:32334/TCP - here 32334 is the port that can be accessed from outside world

# describe a service

k describe service posts-srv

# to get namespaces inside a k cluster

k get namespaces

# to get all services inside a namespace

k get services -n namespacename

# to increment the npm version

npm version patch

# Port forwarding command

k port-forward podname 4222:4222
ex: k port-forward nats-depl-5ffb66495f-glvc8 4222:4222
k port-forward nats-depl-5ffb66495f-glvc8 8222:8222

# to delete trash data inside a nats pod

k delete pod nats-depl-5ffb66495f-glvc8
