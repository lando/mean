MEAN Example
============

This example exists primarily to test the following documentation:

* [MEAN Recipe](https://docs.devwithlando.io/tutorials/mean.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff and start successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use node 14 if specified
lando node -v | grep v14.

# Should be running mysqq 5.7 by database defintion
lando ssh -s database -u root -c "mysql --version" | grep "5.7"

# Should have yarn available
lando yarn -v

# Should have npm available
lando npm -v

# Should have node available
lando node -v

# Should be using custom mysql config file
lando mysql -u root -e "show variables;" | grep thread_cache_size | grep 12
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success

lando destroy -y
lando poweroff
```
