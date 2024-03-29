package com.triana.salesianos.supermerkapp2.fragments;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.tasks.OnSuccessListener;
import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.UtilToken;
import com.triana.salesianos.supermerkapp2.models.CategoryResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;
import com.triana.salesianos.supermerkapp2.retrofit.generator.AuthType;
import com.triana.salesianos.supermerkapp2.retrofit.generator.ServiceGenerator;
import com.triana.salesianos.supermerkapp2.retrofit.services.CategoryService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class CategoryFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    List<CategoryResponse> category = new ArrayList<>();
    String jwt;
    CategoryService service;
    MyCategoryRecyclerViewAdapter adapter;

    public CategoryFragment() {
    }

    public static CategoryFragment newInstance(int columnCount) {
        CategoryFragment fragment = new CategoryFragment();
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
        View view = inflater.inflate(R.layout.fragment_category_list, container, false);

            Context context = view.getContext();
            jwt = UtilToken.getToken(view.getContext());
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }

            service = ServiceGenerator.createService(CategoryService.class);

                Call<ResponseContainer<CategoryResponse>> call = service.getListCategory();
                call.enqueue(new Callback<ResponseContainer<CategoryResponse>>() {
                    @Override
                    public void onResponse(Call<ResponseContainer<CategoryResponse>> call, Response<ResponseContainer<CategoryResponse>> response) {
                        if (response.code() != 200) {
                            Toast.makeText(getActivity(), "Error in request", Toast.LENGTH_SHORT).show();
                        } else {
                            category = response.body().getRows();

                            adapter = new MyCategoryRecyclerViewAdapter(context, category, mListener);
                            recyclerView.setAdapter(adapter);

                        }
                    }

                    @Override
                    public void onFailure(Call<ResponseContainer<CategoryResponse>> call, Throwable t) {
                        Log.e("NetworkFailure", t.getMessage());
                        Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();
                    }
                });

        return view;
    }

    public interface OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentInteraction(CategoryResponse item);
    }
}
