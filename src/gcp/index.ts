import compute from '@google-cloud/compute';
import config from '../config';

async function changeInstance({
    action,
    instance,
    successCallback,
    alreadyRunningCallback
}: {
    action: 'start' | 'stop';
    instance: string;
    successCallback: () => void;
    alreadyRunningCallback: () => void;
}): Promise<boolean> {
    const instancesClient = new compute.InstancesClient();

    const computerInstance = await instancesClient.get({
        instance,
        project: config.gcp.projectId,
        zone: config.gcp.zone,
    });

    if (computerInstance[0].status === 'RUNNING') {
        alreadyRunningCallback();
        return false;
    }

    const [response] = await instancesClient[action]({
        project: config.gcp.projectId,
        zone: config.gcp.zone,
        instance,
    });
    const operationsClient = new compute.ZoneOperationsClient();
    await operationsClient.wait({
        operation: response.latestResponse.name,
        project: config.gcp.projectId,
        zone: config.gcp.zone.split('/').pop(),
    });

    successCallback();
    return true;
}

export default {
    changeInstance
}