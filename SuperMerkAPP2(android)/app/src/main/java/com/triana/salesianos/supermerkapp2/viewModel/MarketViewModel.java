package com.triana.salesianos.supermerkapp2.viewModel;

import android.app.Application;
import android.arch.lifecycle.AndroidViewModel;
import android.arch.lifecycle.MutableLiveData;
import android.support.annotation.NonNull;
import android.util.Log;

import com.triana.salesianos.supermerkapp2.models.MarketResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;
import com.triana.salesianos.supermerkapp2.models.ResponseContainerTwo;
import com.triana.salesianos.supermerkapp2.retrofit.generator.ServiceGenerator;
import com.triana.salesianos.supermerkapp2.retrofit.services.MarketService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MarketViewModel extends AndroidViewModel{

    private MutableLiveData<List<MarketResponse>> listMarket = new MutableLiveData<List<MarketResponse>>();
    private MutableLiveData<MarketResponse> market = new MutableLiveData<MarketResponse>();

    private MarketService marketService;

    public MarketViewModel(@NonNull Application application){
        super(application);
        getAllMarkets();
    }

    public void getAllMarkets() {
        marketService = ServiceGenerator.createService(MarketService.class);
        Call<ResponseContainer<MarketResponse>> call = marketService.getListMarkets();
        call.enqueue(new Callback<ResponseContainer<MarketResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<MarketResponse>> call, Response<ResponseContainer<MarketResponse>> response) {
                try {
                    ResponseContainer<MarketResponse> data = response.body();
                    listMarket.setValue(data.getRows());
                } catch (Exception e){
                    Log.d("onResponse", "Error here");
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<MarketResponse>> call, Throwable t) {
                Log.e("NetworkError", t.getMessage());
            }
        });
    }

    public void getMarketDetails(String id){
        marketService = ServiceGenerator.createService(MarketService.class);
        Call<ResponseContainerTwo<MarketResponse>> call = marketService.getMarket(id);
        call.enqueue(new Callback<ResponseContainerTwo<MarketResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainerTwo<MarketResponse>> call, Response<ResponseContainerTwo<MarketResponse>> response) {
                try {
                    ResponseContainerTwo<MarketResponse> data = response.body();
                    market.setValue(data.getRows());

                } catch (Exception e){
                    Log.e("onResponse", response.message());
                }
            }

            @Override
            public void onFailure(Call<ResponseContainerTwo<MarketResponse>> call, Throwable t) {
                Log.e("onFailureSetFav", t.getMessage());
            }
        });
    }

    public MutableLiveData<List<MarketResponse>> getListMarket(){
        return listMarket;
    }
    public MutableLiveData<MarketResponse> getMarket(){
        return market;
    }
}
