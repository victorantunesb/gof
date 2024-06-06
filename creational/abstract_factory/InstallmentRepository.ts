import Installment from "./Installment";
import Loan from "./Loan";

export default interface InstallmentRepository {
    save (installment: Installment): Promise<void>
    listByLoanId (loanId: string): Promise<Installment[]>
}

export class InstallmentRepositoryMemory implements InstallmentRepository {
    installments: Installment[] = []

    async save(installment: Installment): Promise<void> {
        this.installments.push(installment)
    }

    async listByLoanId(loanId: string): Promise<Installment[]> {
        const installments = this.installments.filter(installment => installment.loanId === loanId)
        return installments
    }
}