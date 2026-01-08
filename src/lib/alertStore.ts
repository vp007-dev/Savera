// Simple in-memory store with event-based updates for real-time alert sync

export interface GovernmentAlert {
  id: string;
  type: "emergency" | "outage" | "conservation" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

type AlertListener = (alerts: GovernmentAlert[]) => void;

class AlertStore {
  private alerts: GovernmentAlert[] = [];
  private listeners: Set<AlertListener> = new Set();

  constructor() {
    // Load from localStorage on init
    const stored = localStorage.getItem('government_alerts');
    if (stored) {
      try {
        this.alerts = JSON.parse(stored).map((a: any) => ({
          ...a,
          timestamp: new Date(a.timestamp)
        }));
      } catch (e) {
        this.alerts = [];
      }
    }
  }

  private persist() {
    localStorage.setItem('government_alerts', JSON.stringify(this.alerts));
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.alerts]));
  }

  subscribe(listener: AlertListener): () => void {
    this.listeners.add(listener);
    // Immediately call with current state
    listener([...this.alerts]);
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  sendAlert(type: GovernmentAlert['type'], title: string, message: string) {
    const newAlert: GovernmentAlert = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    };
    
    this.alerts = [newAlert, ...this.alerts];
    this.persist();
    this.notify();
    
    return newAlert;
  }

  markAsRead(id: string) {
    this.alerts = this.alerts.map(a => 
      a.id === id ? { ...a, read: true } : a
    );
    this.persist();
    this.notify();
  }

  markAllAsRead() {
    this.alerts = this.alerts.map(a => ({ ...a, read: true }));
    this.persist();
    this.notify();
  }

  getAlerts() {
    return [...this.alerts];
  }

  getUnreadCount() {
    return this.alerts.filter(a => !a.read).length;
  }
}

// Singleton instance
export const alertStore = new AlertStore();
