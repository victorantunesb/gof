import { expect, it } from "vitest";
import ApplyForLoan  from "./ApplyForLoan";
import { LoanRepositoryMemory } from "./LoanRepository";
import { InstallmentRepositoryMemory } from "./InstallmentRepository";
import GetLoan from "./GetLoan";

it('Deve solicitar um financiamento imobiliário', async function () {
    const loanRepository = new LoanRepositoryMemory()
    const installmentRepository = new InstallmentRepositoryMemory()
    const applyForLoan = new ApplyForLoan(loanRepository, installmentRepository)
    const input = {
        amount: 100000,
        income: 10000,
        installments: 240,
        type: 'mortgage'
    }
    const outputApplyForLoan = await applyForLoan.execute(input)
    const getLoan = new GetLoan(loanRepository, installmentRepository)
    const outputGetLoan = await getLoan.execute(outputApplyForLoan)
    expect(outputGetLoan.amount).toBe(100000)
    expect(outputGetLoan.income).toBe(10000)
    expect(outputGetLoan.installments).toHaveLength(240)
    expect(outputGetLoan.installments.at(0)?.number).toBe(1)
    expect(outputGetLoan.installments.at(0)?.amount).toBe(1250)
    expect(outputGetLoan.installments.at(0)?.amortization).toBe(416.67)
    expect(outputGetLoan.installments.at(0)?.interest).toBe(833.33)
    expect(outputGetLoan.installments.at(0)?.balance).toBe(99583.33)
    expect(outputGetLoan.installments.at(239)?.number).toBe(240)
    expect(outputGetLoan.installments.at(239)?.amount).toBe(420.14)
    expect(outputGetLoan.installments.at(239)?.amortization).toBe(416.67)
    expect(outputGetLoan.installments.at(239)?.interest).toBe(3.47)
    expect(outputGetLoan.installments.at(239)?.balance).toBe(0)

})