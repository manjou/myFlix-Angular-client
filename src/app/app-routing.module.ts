// Import necessary modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

// Define the routes for the application
const routes: Routes = [
  // Route for the user profile page
  { path: 'profile', component: UserProfileComponent }
];

/**
 * AppRoutingModule class
 * 
 * This class is responsible for defining the routes for the application.
 */
@NgModule({
  // Import RouterModule and configure it with the routes
  imports: [RouterModule.forRoot(routes)],
  // Export RouterModule so it's available throughout the app
  exports: [RouterModule]
})
export class AppRoutingModule { }