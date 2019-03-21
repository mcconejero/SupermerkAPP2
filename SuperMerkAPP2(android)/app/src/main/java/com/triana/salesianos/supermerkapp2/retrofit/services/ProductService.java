package com.triana.salesianos.supermerkapp2.retrofit.services;

import com.triana.salesianos.supermerkapp2.models.ProductResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ProductService {

    @GET("products/{idCategory}")
    Call<ResponseContainer<ProductResponse>> getListProduct(@Path("idCategory") String idCategory);

    @GET("products/favs")
    Call<ResponseContainer<ProductResponse>> getFavs();

    @POST("products/fav/{id}")
    Call<ProductResponse> addFav (@Path("id") String id);

    @DELETE("products/fav/{id}")
    Call<ProductResponse> deleteFav(@Path("id") String id);

}
