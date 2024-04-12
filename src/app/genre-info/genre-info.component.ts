import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @Component decorator that specifies the Angular metadata for the component.
 * 
 * @selector app-genre-info - The name of the HTML tag where this component will be inserted.
 * @templateUrl ./genre-info.component.html - The location of the component's template file.
 * @styleUrls ./genre-info.component.scss - The location of the component's private CSS styles.
 */
@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})

/**
 * Component for displaying genre information.
 */
export class GenreInfoComponent {
  /**
   * Constructor for the GenreInfoComponent.
   * 
   * @param dialogRef - Reference to the dialog opened.
   * @param data - The data of the genre to be displayed. Injected via Angular's dependency injection.
   * @property Name - The name of the genre.
   * @property Description - The description of the genre.
   */
  constructor(
    public dialogRef: MatDialogRef<GenreInfoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
     }
  ) { }

}