import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  pageSize: any;
  pageEvent: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterContentInit() {
    const pagesize = parseInt(localStorage.getItem(`pageSize`));
    if (pagesize) {
      this.pageSize = pagesize;
    } else {
      this.pageSize = 5;
    }
  }

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<any>;

  data = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  ];

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.data = [...this.data];

    //   this.dataSource.sortingDataAccessor = (item: any, property: any) => {
    //     switch (property) {
    //       case "process_name":
    //         if (item.process_name) {
    //           return item.process_name.toLowerCase();
    //         } else {
    //           return item.comment;
    //         }
    //       case "process_id":
    //         if (item.process_id) {
    //           return item.process_id.toLowerCase();
    //         } else {
    //           return item.process_id;
    //         }
    //       default:
    //         return item[property];
    //     }
    // }
  }

  getPaginatorData(event: any) {
    localStorage.setItem(`pageSize`, event.pageSize);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
