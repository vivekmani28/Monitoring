#!/bin/sh
grep -A 1 itrust /home/ubuntu/DevOps_Project/hosts | awk '{print $1}' |  awk 'NR%2{printf "%s ",$0;next;}1' > /tmp/hosts_ip
i=1;
cat /tmp/hosts_ip | while read line;
do
ip=`echo $line |  awk '{print $2}'`
count=`ssh -n -i ~/DevOps_Project/ec2.key $ip "ps -ef | grep jetty | grep -v grep | wc -l"`
echo "iTrust2 Instance #${i} - ${ip}, ${count}"
i=$((i+1))
done
