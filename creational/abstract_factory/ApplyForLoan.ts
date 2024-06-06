import { SACInstallmentCalculator } from "./InstallmentCalculator"
import InstallmentRepository from "./InstallmentRepository"
import { MortgageLoan } from "./Loan"
import LoanRepository from "./LoanRepository"
import { RepositoryFactory } from "./RepositoryFactory"

export default class ApplyForLoan {
    loanRepository: LoanRepository
    installmentRepository: InstallmentRepository

    constructor (readonly repositoryFactory: RepositoryFactory) {
        this.loanRepository = repositoryFactory.createLoanRepository()
        this.installmentRepository = repositoryFactory.createInstallmentRepository()
        //Parei aqui 58:50
    }

    async execute (input: Input): Promise<Output> {
        if (input.type === "mortgage") {
            const loan = MortgageLoan.create(input.amount, input.income, input.installments)
            const installmentCalculator = new SACInstallmentCalculator()
            const installments = installmentCalculator.calculate(loan)
            await this.loanRepository.save(loan)
            for (const installment of installments) {
                await this.installmentRepository.save(installment)
            }
            return { loanId: loan.loanId }
        }
        throw new Error('Loan type not available')
    }
}

export type Input = { 
    amount: number
    income: number
    installments: number 
    type: string
}

export type Output = { 
    loanId: string
}
