interface StatsBadgeProps {
    label: string;
    value: number;
    color?: string;
}

function StatsBadge({ label, value, color = '#1e293b' }: StatsBadgeProps) {
    return (
        <div
            style={{
                border: `2px solid ${color}`,
                borderRadius: '8px',
                padding: '16px 24px',
                minWidth: '150px',
                textAlign: 'center',
                background: '#ffffff',
            }}
        >
            <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color }}>
                {value}
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>
                {label}
            </p>
        </div>
    );
}

export default StatsBadge;