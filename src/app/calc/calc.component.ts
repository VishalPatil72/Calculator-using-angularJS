import { Component } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']  // Corrected: styleUrls with an "s"
})
export class CalcComponent {

  currentNo: string = '0';
  firstValue: number | null = null;
  operator: string | null = null;
  waitingForSecondValue: boolean = false;  // Set to false initially
  
  // Handle number button click
  public inputDigit(digit: string): void {
    if (this.waitingForSecondValue) {
      this.currentNo = digit;
      this.waitingForSecondValue = false;  // Reset flag after input
    } else {
      // Append digits, avoiding leading zeros
      this.currentNo = this.currentNo === '0' ? digit : this.currentNo + digit;
    }
    console.log(this.currentNo);
  }

  // Handle operator button click (+, -, *, /)
  public inputOperator(operator: string): void {
    if (this.firstValue === null) {
      this.firstValue = parseFloat(this.currentNo);
    } else if (this.operator) {
      const result = this.performCalculation(this.operator, this.firstValue, parseFloat(this.currentNo));
      this.currentNo = `${result}`;
      this.firstValue = result;
    }

    this.operator = operator;
    this.waitingForSecondValue = true;  // Now wait for the second operand
  }

  // Perform calculation based on the operator
  private performCalculation(operator: string, firstValue: number, secondOperand: number): number {
    console.log('perform calc');
    console.log(operator);
    console.log(firstValue);
    console.log(secondOperand);
    switch (operator) {
      case '+':
        return firstValue + secondOperand;
      case '-':
        return firstValue - secondOperand;
      case '*':
        return firstValue * secondOperand;
      case '/':
        return firstValue / secondOperand;
      default:
        return secondOperand;
    }
  }

  // Handle decimal point input
  public inputDecimal(dot: string): void {
    if (!this.currentNo.includes(dot)) {
      this.currentNo += dot;
    }
  }

  // Clear everything (C button)
  public clear(): void {
    this.currentNo = '0';
    this.firstValue = null;
    this.operator = null;
    this.waitingForSecondValue = false;
  }

  // Calculate result (= button)
  public calculate(): void {
    if (this.operator && this.firstValue !== null) {
      this.currentNo = `${this.performCalculation(this.operator, this.firstValue, parseFloat(this.currentNo))}`;
      console.log(this.currentNo);
      this.operator = null;
      this.firstValue = null;
      this.waitingForSecondValue = false;  // Reset after calculation
      console.log(this.waitingForSecondValue);
    }
  }
}
