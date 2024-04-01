
# Step 5. Installation
In this final step you will install Augoor and verify it is up and running.

## Queue server check
1. Check Install RabbitMQ in the corresponding configuration for the provider
2. Make sure the following Secrets have been created in RABBIT_MQ Namespace:

   - rabbitmq-ca
   - tls-secret
3. Make sure the following Config Maps have been created in Augoor Namespace:

   - cacerts
   - server.crt

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

