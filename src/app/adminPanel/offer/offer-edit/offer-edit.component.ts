import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { OfferService } from '../../../services/offer/offer.service';
import { StoreService } from '../../../services/store/store.service';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrl: './offer-edit.component.css'
})
export class OfferEditComponent implements OnInit {
  stores: any[] = [];
  offerId: any | null = null; // To hold the current offer ID
  offer = {
    discount: 0,
    isActive: '',
    link: '',
    code: '',
    arSmallDesc: '',
    enSmallDesc: '',
    storeId: 0
  };
  selectedFile!: File | null;
  imagePreview: string | null = null;

  constructor(
    private _offerService: OfferService,
    private _storeService: StoreService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.offerId = +this._route.snapshot.paramMap.get('id')!;
    this.loadOffer();
    this.loadStores();
  }

  loadStores() {
    this._storeService.getData(1, 1000,"").subscribe(data => {
      this.stores = data.payload;
    });
  }

  loadOffer() {
    if (this.offerId) {
      this._offerService.GetById(this.offerId).subscribe(data => {
        this.offer = data.payload;
        if (data.payload.image) {
          this.imagePreview = data.payload.image; // Assuming the API returns an image URL
        }
      });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Display a preview of the selected new image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  onSubmit() {
    const formData = new FormData();    
      formData.append('id', this.offerId.toString());

    formData.append('discount', this.offer.discount.toString());
    formData.append('arSmallDesc', this.offer.arSmallDesc);
    formData.append('enSmallDesc', this.offer.enSmallDesc);
    formData.append('isActive', this.offer.isActive);
    formData.append('link', this.offer.link);
    formData.append('code', this.offer.code);
    formData.append('storeId', this.offer.storeId.toString());
 // Add image only if a new file has been selected
 // Add the selected image file
 if (this.selectedFile) {
  formData.append('image', this.selectedFile);
}

      this._offerService.updateData(this.offerId, formData).subscribe(
        response => {
          this._router.navigate(['/dashboard/offer']);
        },
        error => {
          console.error('Server error:', error);
        }
      );
    
  }

  cancel() {
    this._router.navigate(['/dashboard/offer']);
  }
}