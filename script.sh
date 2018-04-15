#!/bin/sh
grep -A 1 itrust /home/ubuntu/DevOps_Project/hosts | grep -v itrust | awk '{print $1}' > /tmp/hosts_ip
i=1;
cat /tmp/hosts_ip | while read line;
do
count=`ssh -n -i ~/DevOps_Project/ec2.key $line "ps -ef | grep jetty | grep -v grep | wc -l"`
echo "iTrust2 Instance #${i}, ${count}"
i=$((i+1))
done
