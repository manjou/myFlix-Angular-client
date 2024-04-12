import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})

/**
 * Component for displaying director information.
 * 
 * @selector app-director-info - The name of the HTML tag where this component will be inserted.
 * @templateUrl ./director-info.component.html - The location of the component's template file.
 * @styleUrls ./director-info.component.scss - The location of the component's private CSS styles.
 */
export class DirectorInfoComponent implements OnInit {

  /**
   * Constructor for the DirectorInfoComponent.
   * 
   * @param data - The data of the director to be displayed. Injected via Angular's dependency injection.
   * @property Name - The name of the director.
   * @property Bio - The biography of the director.
   * @property Birth - The birth date of the director.
   * @property Death - The death date of the director.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
      Death: string;
    }
  ) { }

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
  }

}