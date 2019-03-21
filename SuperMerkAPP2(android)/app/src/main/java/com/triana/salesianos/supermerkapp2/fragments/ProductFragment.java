package com.triana.salesianos.supermerkapp2.fragments;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.UtilToken;
import com.triana.salesianos.supermerkapp2.models.CategoryResponse;
import com.triana.salesianos.supermerkapp2.models.MarketResponse;
import com.triana.salesianos.supermerkapp2.models.ProductResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;
import com.triana.salesianos.supermerkapp2.retrofit.generator.ServiceGenerator;
import com.triana.salesianos.supermerkapp2.retrofit.services.ProductService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class ProductFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private ProductFragment.OnListFragmentInteractionListener mListener;
    List<ProductResponse> product = new ArrayList<>();
    String jwt;
    CategoryResponse categoriaId;
    MarketResponse mercadoId;
    ProductService service;
    MyProductRecyclerViewAdapter adapter;

    @SuppressLint("ValidFragment")
    public ProductFragment(CategoryResponse idCategory, MarketResponse idMarket) {
        categoriaId = idCategory;
        mercadoId = idMarket;
    }

    public ProductFragment() {

    }

    public static ProductFragment newInstance(int columnCount) {
        ProductFragment fragment = new ProductFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_product_list, container, false);

        Context context = view.getContext();
        jwt = UtilToken.getToken(view.getContext());
        RecyclerView recyclerView = (RecyclerView) view;
        if (mColumnCount <= 1) {
            recyclerView.setLayoutManager(new LinearLayoutManager(context));
        } else {
            recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
        }

        service = ServiceGenerator.createService(ProductService.class);

        Call<ResponseContainer<ProductResponse>> call = service.getListProduct(categoriaId.getId(), mercadoId.getId());
        call.enqueue(new Callback<ResponseContainer<ProductResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<ProductResponse>> call, Response<ResponseContainer<ProductResponse>> response) {
                if (response.code() != 200) {
                    Toast.makeText(getActivity(), "Error in request", Toast.LENGTH_SHORT).show();
                } else {
                    product = response.body().getRows();

                    adapter = new MyProductRecyclerViewAdapter(context, product, mListener);
                    recyclerView.setAdapter(adapter);

                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<ProductResponse>> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

        return view;
    }

    public interface OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentInteraction(ProductResponse item);
    }
}
