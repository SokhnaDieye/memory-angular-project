import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

// Modèle de paiement pour typage
interface Payment {
  id?: number;
  project_id: number;
  client_id: number;
  amount_received: number;
  total_amount_due: number;
  payment_date?: string;  // Nullable si non encore payé
  payment_type?: string;
  transaction_reference?: string;
  payment_status: string;  // 'pending', 'paid', 'late'
  due_date: string;
  reminder_sent?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Récupérer tous les paiements
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/payments`);
  }

  // Créer un nouveau paiement
  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/payments`, payment);
  }

  // Mettre à jour un paiement (changer statut, montant, etc.)
  updatePayment(paymentId: number, payment: Partial<Payment>): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/payments/${paymentId}`, payment);
  }

  // Envoyer une relance de paiement
  sendReminder(paymentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments/${paymentId}/send-reminder`, {});
  }

  // Récupérer un paiement spécifique
  getPaymentById(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/payments/${paymentId}`);
  }
}
