import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close({ status: 0 });
  }
  ngOnInit(): void {
  }
  buttonName: any = "Хадгалах";
  submit() {
    this.buttonName = this.data?.button ? this.data?.button : "Хадгалах";
    this.dialogRef.close({ status: 1, categoryName: this.data?.categoryName });
  }

}
