import { expect, it } from "vitest";
import { MortgageLoan } from "./Loan";
import { SACInstallmentCalculator } from "./InstallmentCalculator";

it('Deve calcular as parcelas utilizando SAC', function () {
    const installmentCalculator = new SACInstallmentCalculator()
    const loan = MortgageLoan.create(100000, 10000, 240)
    const installments = installmentCalculator.calculate(loan)
    expect(installments).toHaveLength(240)
})