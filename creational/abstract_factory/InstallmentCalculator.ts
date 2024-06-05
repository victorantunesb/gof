import Installment from "./Installment";
import Loan from "./Loan";

export default interface InstallmentCalculator {

    calculate (loan: Loan): Installment[]
}

export class SACInstallmentCalculator implements InstallmentCalculator {

    calculate(loan: Loan): Installment[] {
        const installment: Installment[] = []
        // parei aqui 25:48
        return installment
    }
}