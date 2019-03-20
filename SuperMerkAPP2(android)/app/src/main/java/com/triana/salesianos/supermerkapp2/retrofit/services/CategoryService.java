package com.triana.salesianos.supermerkapp2.retrofit.services;

import com.triana.salesianos.supermerkapp2.models.CategoryResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;
import com.triana.salesianos.supermerkapp2.models.ResponseContainerTwo;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;


public interface CategoryService {

    @GET("categories")
    Call<ResponseContainer<CategoryResponse>> getListCategory();

    @GET("categories/{id}")
    Call<ResponseContainerTwo<CategoryResponse>> getOneCategory(@Path("id") String id);



}
