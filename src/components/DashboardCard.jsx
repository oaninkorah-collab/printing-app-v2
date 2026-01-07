import "./DashboardCard.css";

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  subtitle,
}) {
  return (
    <div className={`dash-card ${color}`}>
      <div className="dash-card-icon">
        <Icon size={22} />
      </div>

      <div className="dash-card-content">
        <p className="dash-card-title">{title}</p>
        <h2 className="dash-card-value">{value}</h2>
        {subtitle && <small>{subtitle}</small>}
      </div>
    </div>
  );
}
