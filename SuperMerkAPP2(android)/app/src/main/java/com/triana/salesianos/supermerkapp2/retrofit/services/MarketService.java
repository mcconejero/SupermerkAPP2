package com.triana.salesianos.supermerkapp2.retrofit.services;

import com.triana.salesianos.supermerkapp2.models.MarketResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;
import com.triana.salesianos.supermerkapp2.models.ResponseContainerTwo;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface MarketService {

    @GET("markets/{categoriaId}")
    Call<ResponseContainer<MarketResponse>> getListMarket(@Path("categoriaId") String categoriaId);

    @GET("markets")
    Call<ResponseContainer<MarketResponse>> getListMarkets();

    @GET("markets/{id}")
    Call<ResponseContainerTwo<MarketResponse>> getMarket(@Path("id") String id);

}
