import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllPropertiesService } from './../../services/get-all-properties.service';
import { GridOptions } from 'ag-grid-community';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
	public gridApi;
	public gridColumnApi;
	public columnDefs;
	public defaultColDef;;
	public sortingOrder;
	public rowSelection;
	public rowData: any;
	
	public form: FormGroup;
	public filters: any = {
	text: 'name'
	};
  constructor(
	public router: Router,
	public service: GetAllPropertiesService,
	public http: HttpClient,
	public fb: FormBuilder
	) {
	this.columnDefs = [
				{
					headerName: 'Id', 
					field: 'id', 
					valueGetter: (params: any) => {
						// console.log(params, 'get this');
						return `${params.data.id}`;
					  },
					filter: 'agTextColumnFilter', 
				},
				{
					headerName: 'Name', 
					field: 'name',
					filter: 'agTextColumnFilter',
					valueGetter: (params: any) => {
						if (params.data.name !=null) {
						return `${params.data.name}`;
						}
						else{
							return 'N/A';
						}
					  },
				},
				{
					headerName: 'building_name', 
					field: '',
					filter: 'agTextColumnFilter',
				},
				{
					headerName: 'Tower_name', 
					field: '',
					filter: 'agTextColumnFilter',
				},
				{
					headerName: 'property_type_name', 
					field: '',
					filter: 'agTextColumnFilter',
				},
				{
					headerName: 'Min_price', 
					field: 'starting_price',
					valueGetter: (params: any) => {
						if (params.data.starting_price !=null) {
						return `${params.data.starting_price}`;
						}
						else{
							return 'N/A';
						}
					  },
					filter: 'agTextColumnFilter',
				},
				{
					headerName: 'Bedroom', 
					field: '',
					filter: 'agTextColumnFilter',
				},
				{
					headerName: 'Bathroom', 
					field: '',
					filter: 'agTextColumnFilter',
				},
				{
					headerName: 'half_bathroom', 
					field: '',
					filter: 'agTextColumnFilter',
				}   
			];
			this.defaultColDef = {
				editable: true,
				sortable: true,
				flex: 1,
				minWidth: 100,
				filter: true,
				floatingFilter: true,
				resizable: true,
				pagination:true
			  };
			}

   onGridReady(params) {
	   this.gridApi = params.api;
	   this.gridColumnApi = params.columnApi;
	   this.service.getAllData().subscribe((data:any) => {
		this.rowData = data.data;
		console.log(this.rowData, 'data')
		params.api.setRowData(this.rowData); 
	   })
   }

 ngOnInit() {
	//  this.reportApi();
	this.buildForm();
  }

  /**
   * Build form 
   */
  buildForm() {
    this.form = this.fb.group({
      text: ['']
    });
  }

  /**
   * Filter text value 
   */
  onSearch() {
    const row = this.gridApi.getFilterInstance(
      this.filters['text']
    );
	console.log(row, 'row data');
    let filter = this.form.value['text'];
	console.log(filter, 'text filter');
    let condition = {
      type: 'startsWith',
      filter
    };
    row.setModel(condition);
    this.gridApi.onFilterChanged();
  }

   /**
   * Reset the filter
   */
	reset() {
		this.form.reset();
		const contactRow = this.gridApi.getFilterInstance(this.filters['text']);
		contactRow.setModel(null);
		this.gridApi.onFilterChanged();
	  }

   reportApi(){
	this.rowData = this.service.getAllData().pipe(
			map((res:any) => {
				res.data.map((result:any) => {
					console.log(result, 'rowData')
					this.rowData = result;
				});
			})
	);
  }
}
