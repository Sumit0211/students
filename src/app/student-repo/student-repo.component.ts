import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-student-repo',
  templateUrl: './student-repo.component.html',
  styleUrls: ['./student-repo.component.css']
})


export class StudentRepoComponent implements OnInit {
  reportForm!: FormGroup;
  studentReports: any[]=[];

  standards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  subjects: string[] = ['english', 'math', 'science', 'history', 'geography'];
  
  // sort: SortDescriptor[];

 

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
  }

 

  initForm(): void {

    this.reportForm = this.fb.group({

      studentName: ['', [Validators.required, Validators.maxLength(100)]],

      standard: ['', Validators.required],

      english: ['', [Validators.required, Validators.min(0), Validators.max(100)]],

      math: ['', [Validators.required, Validators.min(0), Validators.max(100)]],

      science: ['', [Validators.required, Validators.min(0), Validators.max(100)]],

      history: ['', [Validators.required, Validators.min(0), Validators.max(100)]],

      geography: ['', [Validators.required, Validators.min(0), Validators.max(100)]]

    });

  }
  calculatePercentage(): number {
    if (this.reportForm.valid) {
      const english = +this.reportForm.value.english;
      const math = +this.reportForm.value.math;
      const science = +this.reportForm.value.science;
      const history = +this.reportForm.value.history;
      const geography = +this.reportForm.value.geography;
      const totalMarks = english + math + science + history + geography;
      const percentage = (totalMarks / 5);
      return percentage;
    } else{
      return 0.00;
    }
    
  }

  reportGenerated = false;
  generateReport(): void {
    if (this.reportForm.valid) {
      const percentage = this.calculatePercentage();      
      this.reportGenerated=true;
    } else{
      alert("doest not found");
    }
  }

  showGrid=false;
  public chartData:any[]=[];
  saveReport():void{
    if(this.reportForm.valid){
      const report = {
        studentName: this.reportForm.value.studentName,
        standard: this.reportForm.value.standard,
        english: this.reportForm.value.english,
        math: this.reportForm.value.math,
        science: this.reportForm.value.science,
        history: this.reportForm.value.history,
        geography: this.reportForm.value.geography,
        percentage: this.calculatePercentage()
      };
      this.studentReports.push(report);
      this.updateGridData();
      this.updateChartData();
      this.reportGenerated = false;
      this.showGrid=true;
      this.reportForm.reset();
    }
  }
  // sortDescriptor: SortDescriptor[] = [{ field: 'percentage', dir: 'asc' }];

  // groupDescriptor: GroupDescriptor[] = [{ field: 'standard' }];

  // title: any;

  onReset(): void {
    this.reportForm.reset();
    this.reportGenerated = false;
  }


  public gridView!: GridDataResult;
  public pageSize=5;
  public skip=0;
  public sort: SortDescriptor[] = [{field:'percentage', dir:'asc'}];
  // public sort:SortDescriptor[]= [{field:'percentage', dir:'asc'}];
  public group: GroupDescriptor[] = [{ field: 'standards' }];
  

  updateGridData():void{

    // const sortedData=orderBy(this.studentReports,[this.sort[0].field],[this.sort[0].dir]);

    this.gridView={
      data:this.studentReports.slice(this.skip,this.skip+this.pageSize),
      total:this.studentReports.length
    };
    // this.gridView=process(this.studentReports,{group:this.group});
  }

  pageChange(event:PageChangeEvent):void{
    this.skip=event.skip;
    this.updateGridData();
  }

  dataStateChange(event:DataStateChangeEvent):void{
    if(event.sort){
      const sort=event.sort[0];
      if(sort.field === 'percentage' && sort.dir === 'asc'){
        this.sort=event.sort;
        this.updateGridData();
      }
    }
    // this.updateGridData();
  }


  updateChartData():void{
    this.chartData=this.studentReports.map(report=> ({
      studentName :report.studentName,
      english :report.english,
      math :report.math,
      science :report.science,
      history :report.history,
      geography :report.geography,
      percentage:report.percentage

    })
      );
  }

   // public barChartData: ChartConfiguration<'bar'>['data'] = {

  //   labels:['English', 'Math', 'Science', 'History', 'Geography'],

  //   datasets: [

  //     {

  //       data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', borderColor: 'black',
  // data:[data.english, data.math,data.science,data.history,data.geography], label:'data.studentName'

  //       backgroundColor: 'rgba(255,0,0,0.3)'

  //     }

  //   ]

  // };


}
