import InstallmentRepository from "./InstallmentRepository";
import LoanRepository from "./LoanRepository";

export interface RepositoryFactory {
    createLoanRepository (): LoanRepository
    createInstallmentRepository (): InstallmentRepository
}