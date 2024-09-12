
# Step 4. Installation
In this final step you will install Augoor and verify it is up and running.

## Installing the Chart
Deployment is being done by Augoor Helm Chart.
This chart bootstrap an [Augoor](https://augoor.ai) deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.
This chart bootstrap an [Augoor](https://augoor.ai) deployment on a [OpenShift](https://docs.openshift.com) cluster using the [Helm](https://helm.sh) package manager.

To install the chart with the release name `my-release`:
```console
cd helm
helm install my-release augoor -f ../examples/my-values.yaml --namespace [augoor-k8s-namespace | augoor-openshift-project]
```

### Uninstalling the Chart

To uninstall/delete the `my-release` deployment:
```console
helm delete my-release
```
> IMPORTANT:
The command removes all the Kubernetes components associated with the chart and deletes the release.


::: tip CONGRATULATIONS
You've completed  Augoor installation. Navigate to your Augoor subdomain to start using it.
:::

