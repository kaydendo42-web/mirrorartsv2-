import { INCURSION_CRAFT, INCURSION_PERFORMANCE, type WorkshopActivity } from "@/lib/content/workshops";

export function WorkshopActivityList({ activities }: { activities: WorkshopActivity[] }) {
  return (
    <ul className="workshop-activities">
      {activities.map((activity) => (
        <li key={activity.title}>
          <span>{activity.title}</span>
          {activity.popular && <span className="workshop-popular">Popular</span>}
        </li>
      ))}
    </ul>
  );
}

export default function SchoolsWorkshopsDetail() {
  return (
    <div className="workshop-incursion-lists">
      <div><h3>Performance</h3><WorkshopActivityList activities={INCURSION_PERFORMANCE} /></div>
      <div><h3>Craft workshops</h3><WorkshopActivityList activities={INCURSION_CRAFT} /></div>
    </div>
  );
}
