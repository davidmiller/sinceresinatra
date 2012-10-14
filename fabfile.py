import time
from fabric.api import *

web = ['happenup@deadpansincerity.com']

@hosts(web)
def deploy():
    """
    Pull changes and restart
    """
    with cd("/home/happenup/webapps/rubysincerity/sincere"):
        run("git pull github master")
    # with cd("/home/happenup/webapps/rubysincerity"):
    #     run("./bin/stop")
    #     time.sleep(1)
    #     run("./bin/start")
