import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../services/offer/offer.service';
import { StoreService } from '../../../services/store/store.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrl: './offer-create.component.css'
})
export class OfferCreateComponent implements OnInit{
  constructor(private _offerService: OfferService,private _storeService:StoreService, private _router: Router) {}
  stores: any[] = [];  // Array to hold store data

  offer = {
    discount: 0,
    isActive: '',
    link: '',
    code: '',
    arSmallDesc:'',
    enSmallDesc:'',
    storeId: '',
  };
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  ngOnInit() {
    // Fetch categories from your service and assign them to this.categories
    this.loadStores();
  }
  loadStores() {
    this._storeService.getData(1, 1000,"").subscribe(data => {
      this.stores = data.payload;
    });
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }
  }

  onSubmit() {
    if (!this.selectedImage) {
      console.log("Image file is missing");
      return;
    }

    const formData = new FormData();
    formData.append('discount', this.offer.discount.toString());
    formData.append('arSmallDesc', this.offer.arSmallDesc);
    formData.append('enSmallDesc', this.offer.enSmallDesc);
    formData.append('isActive', this.offer.isActive);
    formData.append('link', this.offer.link);
    formData.append('code', this.offer.code);
    formData.append('image', this.selectedImage, this.selectedImage.name);
    formData.append('storeId', this.offer.storeId.toString());

        this._offerService.postData(formData).subscribe(
      response => {
        this._router.navigate(['/dashboard/offer']);
      },
      error => {
        console.error('Server error:', error);
      }
    );
  }

      }