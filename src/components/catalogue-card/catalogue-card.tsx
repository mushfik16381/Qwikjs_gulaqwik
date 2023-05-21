import { component$, useStyles$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { WorkerUser } from '~/api/workeruser';
import { Capitalize, GetScheduleDescription, GetWorkdaysDescription } from '~/utils';
import styles from './catalogue-card.scss?inline';

interface CatalogueCardProps {
  workeruser: WorkerUser;
}

export default component$((props: CatalogueCardProps) => {
  useStyles$(styles);
  const { workeruser } = props;
  const cardType = (String(workeruser.billingType)?.toLocaleLowerCase() ?? 'elite') + '_card'; 

  const description = (workeruser.currentNeighborhood ? workeruser.currentNeighborhood : workeruser.currentProvince) +
  (GetWorkdaysDescription(workeruser) ? ' - ' + GetWorkdaysDescription(workeruser) : '') +
  (GetScheduleDescription(workeruser) ? (' - ' + GetScheduleDescription(workeruser)) : '') +
  (workeruser.shortDescription && workeruser.billingType !== 'Premium' ? ' - ' + Capitalize(workeruser.shortDescription) : '');

  return <div class={"card catalogue_card " + cardType} title={workeruser.name} style={"background: url(\"" + workeruser.profileImg + "\");"} >
    <Link class="card_clickable" href={"/escort/" + workeruser.slug} target="_self" aria-label={"Escort " + workeruser.name}>Escort {workeruser.name}</Link>
    <Link class="right_clickable" href={"/escort/" + workeruser.slug} target="_self" aria-label={"Escort " + workeruser.name}>Escort {workeruser.name}</Link>
    <div class="card_bottom">
      <p class="name_label">{workeruser.name}</p>
      <p class="description">{description}</p>
    </div>
  </div >
});