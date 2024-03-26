#!/bin/bash
function writeList(){
    kubectl get job  | grep model-inference | cut -d ' ' -f 1 > result.txt
    return 0    
}
writeList
while IFS= read -r line; do
    echo "deleting Job $line"
    kubectl delete job $line
done < result.txt