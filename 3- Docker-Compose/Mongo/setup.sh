#!/bin/bash
USER=$MONGO_DB_USER
PASS=$MONGO_DB_PASSWORD
DB=$MONGO_INITDB_DATABASE

# Create DB User so we dont use ADMIN
echo "Creating user: \"$USER\"..."
mongo $DB --eval "db.createUser({ user: '$USER', pwd: '$PASS', roles: ['readWrite', 'dbAdmin'] });"

# Create a users collection to get it from express
mongo $DB --eval "db.createCollection('users', { capped: true, size: 5242880, max: 5000 });"
# Insert some example users
mongo $DB --eval "db.users.insert([{name:'John', age: 12},{name:'Paul', age: 20},{name:'Max', age: 44}]);"

#Creating MongoExporter User
#mongo $DB --eval "db.getSiblingDB('admin').({ user: 'mongodb_exporter', pwd: 's3cr3tpassw0rd', roles: [{ role: 'clusterMonitor', db: 'admin' }, { role: 'read', db: $DB }] });"

echo "========================================================================"
echo "MongoDB User: \"$USER\""
echo "MongoDB Password: \"$PASS\""
echo "MongoDB Database: \"$DB\""
echo "========================================================================"
