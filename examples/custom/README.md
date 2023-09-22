MEAN Example
============

This example exists primarily to test the following documentation:

* [MEAN Recipe](https://docs.devwithlando.io/tutorials/mean.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Initialize an empty mean recipe
rm -rf mean && mkdir -p mean && cd mean
lando init --source cwd --recipe mean --option node=14 --option port=8055 --option database=mysql --name lando-mean-mysql

# Should start up successfully
cd mean
cp ../../.lando.local.yml .
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use node 14 if specified
cd mean
lando node -v | grep v14.

# Should be running mysqq 5.7 by database defintion
cd mean
lando ssh -s database -u root -c "mysql --version" | grep "5.7"

# Should have yarn available
cd mean
lando yarn -v

# Should have npm available
cd mean
lando npm -v

# Should have node available
cd mean
lando node -v
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mean
lando destroy -y
lando poweroff
```
