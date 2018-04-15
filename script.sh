#!/bin/sh
grep -A 1 itrust /home/ubuntu/DevOps_Project/hosts | awk '{print $1}' |  awk 'NR%2{printf "%s ",$0;next;}1' > /tmp/hosts_ip
i=1;
cat /tmp/hosts_ip | while read line;
do
ip=`echo $line |  awk '{print $2}'`
count=`nc -v $ip 8080 < /dev/null  >> /dev/null 2>&1; echo $?`
if [ "$count" -gt 0 ]
then
  echo "iTrust2 Instance #${i} - ${ip},NOT RUNNING"
else
  echo "iTrust2 Instance #${i} - ${ip},RUNNING"
fi
i=$((i+1))
done
